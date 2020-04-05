import { SET_LOADING, SEARCH_LOGS, SET_CURRENT,UPDATE_LOG,CLEAR_CURRENT, DELETE_LOG, LOGS_ERROR, GET_LOGS, ADD_LOG } from './types';

//export const getLogs = () => {
//    return async (dispatch) => {
//       setLoading();

//        const res = await fetch('/logs');
//        const data = await res.json();
        
//        dispatch({
//            type: GET_LOGS,
//            payload: data
//        });
//    };
//};

//Get logs from the server
export const getLogs = () => async dispatch => {
    try{
        setLoading();

        const res = await fetch('/logs');
        const data = await res.json();
        
        dispatch({
            type: GET_LOGS,
            payload: data
        });
    }catch(err) {
        dispatch({
            type: LOGS_ERROR,
            payload: err.response.statusText
        });
    }
     
};

//ADD new log
export const addLog = log => async dispatch => {
    try{
        setLoading();

        const res = await fetch('/logs', {
            method: 'POST',
            body: JSON.stringify(log),
            headers:{
                'Content-Type': 'application/json'
            }
        });
        const data = await res.json();
        
        dispatch({
            type: ADD_LOG,
            payload: data
        });
    }catch(err) {
        dispatch({
            type: LOGS_ERROR,
            payload: err.response.statusText
        });
    }
     
};

//Delete log from server
export const deleteLog = id => async dispatch => {
    try {
      setLoading();
  
      await fetch(`/logs/${id}`, {
        method: 'DELETE'
      });
  
      dispatch({
        type: DELETE_LOG,
        payload: id
      });
    } catch (err) {
      dispatch({
        type: LOGS_ERROR,
        payload: err.response.statusText
      });
    }
  };
  
// Update log in server 
export const updateLog = log => async dispatch => {
    try {
      setLoading();
  
      const res = await fetch(`/logs/${log.id}`, {
        method: 'PUT',
        body: JSON.stringify(log),
        headers: {
            'Content-Type': 'application/json'
        }
      });
  
      const data = await res.json;

      dispatch({
        type: UPDATE_LOG,
        payload: data
      });
    } catch (err) {
      dispatch({
        type: LOGS_ERROR,
        payload: err.response.statusText
      });
    }
  };
  
 //Search server logs 
export const searchLogs = (text) => async dispatch => {
    try{
        setLoading();

        const res = await fetch(`/logs?q=${text}`);
        const data = await res.json();
        
        dispatch({
            type: SEARCH_LOGS,
            payload: data
        });
    }catch(err) {
        dispatch({
            type: LOGS_ERROR,
            payload: err.response.statusText
        });
    }
     
};

// Set current log
export const setCurrent = log => {
    return {
        type: SET_CURRENT,
        payload: log
    }
}

// Clear current log
export const clearCurrent = () => {
    return {
        type: CLEAR_CURRENT,
    }
}

//SET loading to true
export const setLoading = () => {
    return {
        type: SET_LOADING
    }; 
};