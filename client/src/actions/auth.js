import { AUTH } from '../constants/actionTypes';
import * as api from '../components/api/index';

export const signin = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.login(formData);
    console.log(data)
    if(!data.authorised){
      alert(data.message)
    }
    dispatch({ type: AUTH, data });

    router.push('/overview');
  } catch (error) {
    console.log(error);
  }
};

export const signup = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.register(formData);
    if(!data.authorised){
      alert(data.message)
    }
    dispatch({ type: AUTH, data });

    router.push('/overview');
  } catch (error) {
    console.log(error);
  }
};