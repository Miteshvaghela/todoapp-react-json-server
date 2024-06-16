import React, { useState } from 'react';
import {Form, Button} from 'react-bootstrap';

const AddTaskForm = ({ saveTask }) => {

    const [inputs, setInputs] = useState({});
    const [error, setErrors] = useState({});
    const handleInput = (e) => { 
        setInputs((prev) => {
            if(e.target.name === 'status'){
                return {...prev, [e.target.name] : e.target.checked}
            }else
                return {...prev, [e.target.name] : e.target.value}
        });
    }
    const handleSubmit = (event) => {
        event.preventDefault(); 

        if(!inputs.title || !inputs.description || inputs.title.length <3 || inputs.description.length <3){
            alert('Please enter all fields');
            return;
        }

        let task = {
            id : Math.floor(Math.random() * 1000)+1,
            title : inputs.title,
            description : inputs.description,
            status : inputs.status
        }
        console.log(inputs , ' Task');
        saveTask(task);
        setInputs({});
        //console.log(inputs , ' Task');
        alert('Task has been saved successfully.');
    }
    return (          
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" name='title' defaultValue={inputs.title} onChange={e => handleInput(e)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" name='description' defaultValue={inputs.description} onChange={e => handleInput(e)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="status">
                <Form.Label>Status</Form.Label>
                <Form.Check type='switch' id="status" name='status' onChange={e => handleInput(e)}/>
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form> 
    )
}

export default AddTaskForm;