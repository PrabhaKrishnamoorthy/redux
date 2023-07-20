import React, { useState } from 'react'
//import { addUser } from './userReducer.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createUser} from './userReducer'

function Create() {
    const [name, setName] = useState('');
    const [email, setEmail]= useState('');

    const users = useSelector((state)=>state.users);
    const dispatch=useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e)=>{
        e.preventDefault();
        const newId = users.length >0 ? users[users.length - 1].id +1 :1;
        //dispatch(addUser({id:newId, name:name, email:email}))
        dispatch(
            createUser({
                id:newId,
                name:name,
                email:email
            })
        )
        navigate('/');
    }

  return (
    <div className='d-flex w-100 vh-100 justify-content-center align-items-center'>
        <div className='w-50 border bg-secondary tect-white p-5'>
            <h3>Add New User</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input type="text" name="name" className='form-control' placeholder='enter name'
                    onChange={e=> setName(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="email" name="email" className='form-control' placeholder='enter email'
                    onChange={e=> setEmail(e.target.value)}/>
                </div><br />
                <button className='btn btn-info'>Submit</button>
            </form>
        </div>
    </div>
  )
}

export default Create;