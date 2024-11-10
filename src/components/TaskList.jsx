import React from 'react';
import TaskItem from './TaskItem';
const TaskList = ({ items, deleteTask, updateTask, updateTaskDetail }) => { 
    return (
        <>
           {items.length ? (<ul>
                {items.map((item, index) => (
                    <TaskItem key={index} item={item} deleteTask={deleteTask} updateTask={updateTask} updateTaskDetail={updateTaskDetail}/>
                ))}
            </ul>) : 'No tasks found.' }
        </>
    )
}

export default TaskList;