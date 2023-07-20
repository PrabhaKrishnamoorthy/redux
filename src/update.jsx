import React, { useState } from 'react'
import {useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
//import { updateUser } from './userReducer';
import {updateUserById} from './userReducer'; 

function Update() {
    const {id} = useParams();
    const users = useSelector((state)=>state.users);

    const existingUser = users.filter((user)=>user.id === parseInt(id));
    const {name, email} = existingUser[0];
    const [upname, setUpname]=useState(name);
    const [upemail, setUpemail]= useState(email);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleUpdate = (e)=>{
        e.preventDefault();
        /*
        dispatch(updateUser({
            id: parseInt(id),
            name: upname,
            email: upemail,
        }))
        */
       dispatch(
        updateUserById(
            parseInt(id),{
            name:upname,
            email:upemail,
        })
       );
        navigate('/');
    };

  return (
    <div className='d-flex w-100 vh-100 justify-content-center align-items-center'>
        <div className='w-50 border bg-secondary tect-white p-5'>
            <h3>Update User</h3>
            <form onSubmit={handleUpdate}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input type="text" name="name" className='form-control'
                    value={upname} onChange={e=>setUpname(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="email" name="email" className='form-control'
                    value={upemail} onChange={e=>setUpemail(e.target.value)}/>
                </div><br />
                <button className='btn btn-info'>Update</button>
            </form>
        </div>
    </div>
  )
}

export default Update