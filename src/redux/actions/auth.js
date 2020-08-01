import axios from 'axios';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from './types';
import setAuthToken from '../../utils/setAuthToken';
import AsyncStorage from '@react-native-community/async-storage';
import {endPoint} from '../api';
import * as RootNavigation from '../../RootNavigation';

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      AsyncStorage.clear();
      setAuthToken(null);
      RootNavigation.popToTop();
      RootNavigation.replace('SignIn');
    }
    return error;
  },
);

const _retrieveData = async (name) => {
  try {
    const value = await AsyncStorage.getItem(name);
    if (value !== null) {
      // We have data!!
      return value;
    } else {
      return null;
    }
  } catch (error) {
    // Error retrieving data
    return null;
  }
};

const _saveDataToAsyncStorage = async (name, value) => {
  await AsyncStorage.setItem(name, value);
};

// Load User
export const loadUser = () => async (dispatch) => {
  const token = await _retrieveData('token');
  if (token) {
    setAuthToken(token);
  }

  return new Promise((resolve, reject) => {
    axios
      .get(endPoint + '/api/accounts/auth/')
      .then((res) => {
        dispatch({
          type: USER_LOADED,
          payload: res.data,
        });

        _saveDataToAsyncStorage('uuid', res.data.uuid);
        _saveDataToAsyncStorage('username', res.data.username);
        _saveDataToAsyncStorage('first_name', res.data.first_name);
        _saveDataToAsyncStorage('last_name', res.data.last_name);

        resolve(true);
      })
      .catch((err) => {
        dispatch({
          type: AUTH_ERROR,
        });
        reject(err);
      });
  });
};

// Register User
export const register = (formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({...formData});

  try {
    const res = await axios.post(
      endPoint + '/api/accounts/auth/register/',
      body,
      config,
    );

    await _saveDataToAsyncStorage('token', res.data.token);
    await _saveDataToAsyncStorage('logged_in', JSON.stringify(true));

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());

    RootNavigation.popToTop();
    RootNavigation.replace('Home');
  } catch (err) {
    const errors = err.response.data.errors;

    // if (errors) {
    //   errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    // }

    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

// Login User
export const login = (username, password) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({username, password});

  try {
    const res = await axios.post(
      endPoint + '/api/accounts/auth/login/',
      body,
      config,
    );

    await _saveDataToAsyncStorage('token', res.data.token);
    await _saveDataToAsyncStorage('logged_in', JSON.stringify(true));

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());

    RootNavigation.replace('Home');
  } catch (err) {
    // const errors = err.response.data.errors ? err.response.data.errors : false;
    // if (errors) {
    //   errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    // }
    console.log(err);
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

// Logout / Clear Profile
export const logout = () => (dispatch) => {
  // dispatch({ type: CLEAR_PROFILE });
  AsyncStorage.clear();
  setAuthToken(null);
  RootNavigation.popToTop();
  RootNavigation.replace('SignIn');
  dispatch({type: LOGOUT});
};
