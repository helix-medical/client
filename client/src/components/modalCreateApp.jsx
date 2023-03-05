import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { useState } from "react";
import axios from "axios";

function ModalCreateApp(props) {
    const handleClose = () => props.toggleModal();

    const [data, setData] = useState({
        patientId: 0,
        date: "",
        time: "",
        names: "",
        reasons: "",
        anamnesis: "{}",
        conclusion: "{}"
    });

    const handleChange = (e) => {
        setData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleClick = async (e) => {
        let index;
        const finalData = {
            patientId: data.patientId,
            date: data.date + " " + data.time,
            names: data.names,
            reasons: data.reasons,
            anamnesis: data.anamnesis,
            conclusion: data.conclusion
        }
        e.preventDefault();
        try {
            index = await axios.post(`http://${process.env.REACT_APP_BACKEND_API}/appointments/new`, finalData);
            console.log(index);
        } catch (error) {
            console.log(error);
        }
        props.toggleModal();
        // go to the new appointment page
        window.location.href = "http://localhost:3000/appointments/new/" + index.data;
    }

    return (
        <Modal show={props.show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Create Appointment</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <FloatingLabel className='mb-3' controlId="floatingDate" label="Date">
                        <Form.Control type="date" placeholder="Date" onChange={handleChange} name='date' />
                    </FloatingLabel>
                    <FloatingLabel className='mb-3' controlId="floatingTime" label="Time">
                        <Form.Control type="time" placeholder="Time" onChange={handleChange} name='time' />
                    </FloatingLabel>
                    <FloatingLabel className='mb-3' controlId="floatingPatientId" label="Patient ID">
                        <Form.Control type="number" placeholder="Patient ID" onChange={handleChange} name='patientId' />
                    </FloatingLabel>
                    <FloatingLabel className='mb-3' controlId="floatingKind" label="Kind">
                        <Form.Select onChange={handleChange} name="reasons">
                            <option>Choose Option</option>
                            <option value="first-visit">First Visit</option>
                            <option value="follow-up">Follow Up</option>
                            <option value="pediatrics">Pediatrics</option>
                            <option value="maternity">Maternity</option>
                        </Form.Select>
                    </FloatingLabel>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-secondary" onClick={handleClose}>Cancel</Button>
                <Button variant='primary' onClick={handleClick}>Submit</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalCreateApp;