import streams from '../apis/streams';
import { 
    CREATE_STREAM, FETCH_STREAM, FETCH_STREAMS, EDIT_STREAM, DELETE_STREAM
} from './types'

export const signIn = (userId) => {
    return {
        type: 'SIGN_IN',
        payload: userId
    };
};

export const signOut = () => {
    return {
        type: 'SIGN_OUT'
    };
};

// createstream actioncreator -> creates a post request for 
export const createStream = ( formValues ) => async (dispatch)=>{
    const response = await streams.post('/streams', formValues);
    
    dispatch({ type: CREATE_STREAM, payload: response.data});
};


