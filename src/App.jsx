import React, {useState, useEffect} from 'react';
import { Container, Row, Col, AccordionHeader, AccordionItem } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import AddTaskForm from './components/AddTaskForm';
import TaskList from './components/TaskList';

// const staticTasks = [
//   {
//     id : 1,
//     title : 'Task 1',
//     description : 'Description 1',
//     status : true
//   },
//   {
//     id : 2,
//     title : 'Task 2',
//     description : 'Description 2',
//     status : false
//   },
//   {
//     id : 3,
//     title : 'Task 3',
//     description : 'Description 3',
//     status : false
//   } 
// ];

const App = () => {

  const [items, setItems] = useState([]);
  const [addFormTitle, setAddFormTitle] = useState('Add new task')

  useEffect(() => {
    // fetch tasks from json-server 
    
    const fetchTasks = async () => {
      const data = await fetch('http://localhost:9000/tasks');
      const res = await data.json();
      setItems(res);
    }

    fetchTasks();


  }, []);


  const saveTask = async (task) => {

    await fetch('http://localhost:9000/tasks', {
      method : 'POST',
      headers : {
        'Content-Type' : 'application/json',        
      },
      body : JSON.stringify(task)
    });

    setItems([...items, task]);
  };

  const deleteTask = async (id) => {
    console.log(id , ' : id');
    await fetch(`http://localhost:9000/tasks/${id}`, {
      method : 'DELETE', 
    })

    setItems(items.filter(item => item.id !== id));
  }

  const updateTaskDetail = async (task) => {
    
    const getTask = await fetch(`http://localhost:9000/tasks/${task.id}`, {
      method : 'GET',
      headers : {
        'Content-Type' : 'application/json',
      }
    })
    const response = await getTask.json(); 

    if(response.id){ // got the updating item
      setAddFormTitle('Update task');    
      console.log(response, ' : response'); 
    }
  }
  const updateTask = async (task) => {
    
    const getTask = await fetch(`http://localhost:9000/tasks/${task.id}`, {
      method : 'GET',
      headers : {
        'Content-Type' : 'application/json',
      }
    });
    const res = await getTask.json();

    if(res.id){ // got the updating item

      res.status = !res.status;

      await fetch(`http://localhost:9000/tasks/${task.id}`, {
        method : 'PUT',
        headers : {
          'Content-Type' : 'application/json',
        },
        body : JSON.stringify(res)
      })

      setItems(items.map(item => item.id === res.id ? res : item));

    }
  }

  return (
    <Container className='dark'>
      <Row>
        <h2 className='text-center my-5'>Todo List React application</h2>
        <Row>
          <Accordion defaultActiveKey='0'>
            <AccordionItem eventKey='0'>
              <Accordion.Header className=''>
                <Col>
                  <h4>List of tasks</h4>
                </Col>
              </Accordion.Header>
              <Accordion.Body>
                  <TaskList items={items} deleteTask={deleteTask} updateTask={updateTask} updateTaskDetail={updateTaskDetail}/>
              </Accordion.Body>
            </AccordionItem>

            <AccordionItem eventKey='1'>
              <Accordion.Header>
                <Col>
                  <h4>{addFormTitle}</h4>
                </Col>
              </Accordion.Header>
              <Accordion.Body>
                  <AddTaskForm saveTask={saveTask}/>
              </Accordion.Body>
            </AccordionItem>
          </Accordion>
        </Row>
      </Row>
    </Container>
  )
}

export default App;