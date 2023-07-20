import React, { useEffect } from 'react'
import { useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
//import { deleteUser } from './userReducer';
import {fetchUsers, deleteUserById} from './userReducer'

function Home() {
    const users = useSelector((state)=>state.users);
    //console.log(users)

    const dispatch= useDispatch();

    useEffect(()=>{
      dispatch(fetchUsers());
    },[dispatch]);

    const handleDelete = (id)=>{
      //dispatch(deleteUser({id : id}))
      dispatch(deleteUserById(id));
    };


  return (
    <div className='container'>
        <h2>Crud app with json server</h2>
        <Link to='/create' className='btn btn-success mt-3'>create+</Link>
        <table className='table'>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
              {users.map((user, index)=>(
                <tr key = {index}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <Link to={`/edit/${user.id}`} className='btn btn-sm btn-primary'>Edit</Link>{' '}
                    <button onClick={()=>handleDelete(user.id)} className='btn btn-sm btn-danger'>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
        </table>

    </div>
  )
}

export default Home