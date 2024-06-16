import React from 'react';
import { FaTimes } from 'react-icons/fa';

const TaskItem = ({ item, deleteTask, updateTask }) => {
    return (
        <div key={item.id} className={`alert alert-${item.status ? 'success' : 'danger'} task-item p-4 mb-2 position-relative bg-opacity-25`} role="alert" style={{ cursor: 'pointer' }} onDoubleClick={e => updateTask(item)}>
            <h4>{item.title}</h4>
            <span>{item.description}</span>
            <span className='position-absolute top-0 end-0 p-4'><FaTimes style={{ color: 'red', fontSize: '20px', cursor: 'pointer' }} className='' onClick={e => deleteTask(item.id)} /></span>
        </div>
    )
}

export default TaskItem;