import './style.css';
import { useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Login from './Login';
let mode = 0
export default function Dashboard() {
    let login = localStorage.getItem('login');
    if(login=="undefined"){
        login=0
    }
    const inputRef = useRef(null)
    const [modalShow, setModalShow] = useState(false);
    const [flag,setFlag] = useState(0);
    const [data, setData] = useState(null);
    const [file, setFile] = useState(null);
    const [responsemessage, setResponseMessage] = useState('');
    let userdata = JSON.parse(localStorage.getItem('userdata')) ?? [];
    const handleFileSelect = (event) => {
        setFile(event.target.files[0].name);
    };

    const handleClick = (e) => {
        setData(e.target.getAttribute('id'));
        inputRef.current.click()
    }

    const handleUpload = () => {
        if (file) {
            if (data) {
                userdata.splice(data, 1, file)
                localStorage.setItem('userdata', JSON.stringify(userdata))
                setData(null)
            }
            else {
                mode = 1
                userdata.push(file)
            }
            mode = 1
            localStorage.setItem('userdata', JSON.stringify(userdata))
            setResponseMessage("File Uploaded Successfully!")
            setModalShow(true)
        }
        else {
            setResponseMessage("Please Upload a File.");
            setModalShow(true)
        }
    };

    function deleteTodo(e) {
        userdata.splice(e.target.getAttribute('id'), 1)
        localStorage.setItem("userdata", JSON.stringify(userdata))
        setResponseMessage("File Deleted Successfully!")
        mode = 1
        setModalShow(true)
    }

    function clickHandle() {
        setResponseMessage("Log Out Successful!")
        setFlag(1)
        mode=1
        setModalShow(true)
    }

    return (
        <div>
            {login ?
                <div id='dashboard'>
                    < div id='menu' >
                        <div id='inside'>
                            <h4 id='inside-h4'>WELCOME&nbsp;ADMIN</h4>
                        </div>
                        <div id='inside-right'>
                            <p id='logout' onClick={clickHandle}>LOG&nbsp;OUT</p>
                        </div>
                    </div >
                    <div id='card'>
                        <div id="drop-zone" type="file" onChange={handleFileSelect} style={{ border: "2px dashed #ccc", padding: "0" }}>
                            <div id='icon'></div>
                            <input id='choose-file' ref={inputRef} type="file" onChange={handleFileSelect} />
                            or Drop file here
                        </div>
                        <br /><button id="upload-btn" className='upload' onClick={handleUpload}>Upload</button>
                        <MyVerticallyCenteredModal show={modalShow} name={responsemessage} value={mode} onHide={() => {
                            if(flag==1){
                                localStorage.setItem("login",JSON.stringify())
                                window.location.href="/"
                            }
                            else {
                                window.location.reload()
                            }
                            setModalShow(false)
                        }} />
                    </div>
                    <div className="container">
                        <ul id="lists">
                            {Object.values(userdata).map((value, index) => {
                                return (
                                    <li className='li' key={index}>{value}<div className='list-div'>
                                        <button id={index} onClick={deleteTodo} className="delete">DELETE</button>
                                        <button id={index} onClick={handleClick} className="edit">EDIT</button></div></li>
                                )
                            })}
                        </ul>
                    </div>
                </div > : <Login />}
        </div>
    )
}

function MyVerticallyCenteredModal(props) {
    return (
        <Modal {...props} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    <span id='title-msg'>{props.value ? "Message" : "Error"}</span>&nbsp;
                    {props.value ? <span id='message'>&#x2713;</span> : <span id='warning'>&#x26A0;</span>}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4 id='info'>{props.name ? props.name : "Upload a File"}</h4>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}