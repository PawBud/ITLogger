import { GET_TECHS, ADD_TECH, DELETE_TECH, SET_LOADING, TECHS_ERROR, ADD_LOG } from '../actions/types';


const initialState = {
    techs: null,
    loading: false,
    error: null
}

export default (state = initialState, action) => {
    switch(action.type) {
        case SET_LOADING:
            return {
                ...state,
                loading: true
            }
        case GET_TECHS:
            return {
                ...state,
                techs: action.payload,
                loading: false
            }
        case DELETE_TECH:
            return {
                ...state,
                techs: state.techs.filter(tech => tech.id !== action.payload),
                loading: false
            }
        case ADD_TECH:
            return {
                ...state,
                techs: [...state.techs, action.payload],
                loading: false
            }
        case TECHS_ERROR:
                console.error(action.payload);
                return{
                    ...state,
                    error: action.payload,
                    loading: false
                }
        default:
            return state;
    }
}