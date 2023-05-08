import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
interface sorttype {
  currentPage:number
  setperpage:number
  searchTearm:string
  sortField:number
  sortOrder:string
}
export const userDataTable:any = createAsyncThunk (
  "userdatatable/usersget",
  async ({currentPage,setperpage,sortField,sortOrder,searchTearm}:sorttype,{rejectWithValue}) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/users?_page=${currentPage}&_limit=${setperpage}&_sort=${sortField}&_order=${sortOrder}&q=${searchTearm}`)
    let total= response.headers['x-total-count']
    return {data:response.data,total}
  } catch (error:any) {
    rejectWithValue(error.response.data)
  }
});
interface AddDataPayload {
  formData: FormData;
}
export const addData:any = createAsyncThunk(
  'adduserdata/addData',
  async ({ formData }: AddDataPayload) => {
    const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/users`,formData);
    return response.data;
  }
);
interface updatetype {
  id:number,user:any
}
// const API_ENDPOINT = 'http://localhost:8000/users/{id}'; 
export const updatedUser:any = createAsyncThunk(
  "updatadusers/update",
  async ({id,user}:updatetype,{rejectWithValue}) => {
   
    try {
      const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/users/${id}`,user)
      // const {data} = await axios.put(`${process.env.REACT_APP_BASE_URL}/users/${id}`,id:{isDeleted:true})
      // let total= response.headers['x-total-count']
 
      return  response.data
      // return {data:response.data,total}
      // return response.data
    } catch (error:any) {
      rejectWithValue(error.response.data)
    }
  }
) 
export const deleteUser:any = createAsyncThunk(
  "deleteuser/delete",
  async (id,{rejectWithValue}) => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/users/${id}`)
    return  response.data
    } catch (error:any) {
      rejectWithValue(error.response.data)
    }
  }
)


// export const deleteUser = createAsyncThunk(
//   'users/deleteUser',
//   async (key) => {
//     await axios.delete(`https://example.com/api/users/${key}`);
//     return key;
//   }
// );
// export const searchUser:any = createAsyncThunk(
//   "searchusers/search",
//   async ({currentPage,setperpage,searchTearm}:sorttype,{rejectWithValue}) => {
//       try {
//     const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/users?_page=${currentPage}&_limit=${setperpage}&q=${searchTearm}`);
//     let total= response.headers['x-total-count']
// return {data:response.data,total}
//   } catch (error:any) {
//     rejectWithValue(error.response.data)
//   }
// })

// export const SortedRecords:any = createAsyncThunk (
//   "sortusers/sortdata",
//   async (desc,{rejectWithValue}) => {
//   try {
//     const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/users?_sort=id&_order=${desc}`)
//     let total= response.headers['x-total-count']
// return {data:response.data,total}
//   } catch (error:any) {
//     rejectWithValue(error.response.data)
//   }
// });

