import { createSlice } from "@reduxjs/toolkit";
//import { userList } from "./Data";
import axios from 'axios';

const userSlice = createSlice({
    name:"users",
    //initialState: userList,
    initialState:[],
    /*
    reducers:{
        addUser: (state, action)=>{
            //console.log(action)
            state.push(action.payload)
        },
        updateUser: (state, action)=>{
            //console.log(action)
            const { id, name, email }= action.payload;
            const upuser= state.find(user =>user.id === id);
            if(upuser){
                upuser.name = name;
                upuser.email = email;
            }
        },
        deleteUser:(state, action)=>{
            const {id} = action.payload;
            const upuser = state.find(user =>user.id === id);
            if(upuser){
                return state.filter( f =>f.id !== id)
            }
        },
    },
*/
        reducers:{
            setUsers:(state, action)=>{
                return action.payload;
            },
            addUser:(state,action)=>{
                state.push(action.payload)
            },
            updateUser:(state, action)=>{
                const {id, name, email} =  action.payload;
                const userIndex = state.findIndex((user)=>user.id === id);
                if(userIndex !== -1){
                    state[userIndex] = {id,name, email};
                }
            },
            deleteUser:(state, action)=>{
                const{id}=action.payload;
                return state.filter((user)=>user.id !== id);
            },
        },
})

export const { setUsers, addUser, updateUser, deleteUser}=userSlice.actions;

export const fetchUsers = () =>{
    return async (dispatch) =>{
        try{
            const response = await axios.get("http://localhost:5000/users");
            dispatch(setUsers(response.data));
        }catch(err){
            console.error("error fetching users:",err);
            console.log("Error message from response:", err.response);
        }
    }
};

export const createUser = (user) => {
    return async (dispatch) => {
      try {
        const response = await axios.post('http://localhost:5000/users', user);
        dispatch(addUser(response.data));
      } catch (error) {
        console.error('Error creating user:', error);
      }
    };
  };
  
export const updateUserById = (id, user) => {
    return async (dispatch) => {
      try {
        const response = await axios.put(`http://localhost:5000/users/${id}`, user);
        dispatch(updateUser(response.data));
      } catch (error) {
        console.error('Error updating user:', error);
      }
    };
  };
  
export const deleteUserById = (id) => {
    return async (dispatch) => {
      try {
        await axios.delete(`http://localhost:5000/users/${id}`);
        dispatch(deleteUser({ id }));
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    };
  };

export default userSlice.reducer;