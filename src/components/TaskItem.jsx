import React from 'react';
import { FaTimes, FaEdit } from 'react-icons/fa';

const TaskItem = ({ item, deleteTask, updateTask, updateTaskDetail }) => {
    return (
        <div key={item.id} className={`alert alert-${item.status ? 'success' : 'danger'} task-item p-4 mb-2 position-relative bg-opacity-25`} role="alert" style={{ cursor: 'pointer' }} onDoubleClick={e => updateTask(item)}>
            <h4>{item.title}</h4>
            <span>{item.description}</span>
            <div className=" position-absolute end-0 px-3 top-0">                
                <span className=''><FaEdit style={{ color: 'green', fontSize: '20px', cursor: 'pointer' }} className='' onClick={e => updateTaskDetail(item)}  /></span>
                <span className=''><FaTimes style={{ color: 'red', fontSize: '20px', cursor: 'pointer' }} className='' onClick={e => deleteTask(item.id)} /></span>
            </div>
        </div>
    )
}

export default TaskItem;