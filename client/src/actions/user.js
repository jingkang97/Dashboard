import { GET_USER, GET_USERS, EDIT_USER } from '../constants/actionTypes';
import * as api from '../components/api/index';

export const getuser = (username) => async (dispatch) => {
  try {
    const { data } = await api.getUser(username);
    console.log(data)
    dispatch({ type: GET_USER, data });

  } catch (error) {
    console.log(error);
  }
};

export const getusers = () => async (dispatch) => {
  try {
    const { data } = await api.getUsers();
    dispatch({ type: GET_USERS, data });
    
  } catch (error) {
    console.log(error);
  }
};

export const edituser = (formData) => async (dispatch) => {
  try {
    const { data } = await api.editUser(formData);
    dispatch({ type: EDIT_USER, data });
  
  } catch (error) {
    console.log(error);
  }
};

