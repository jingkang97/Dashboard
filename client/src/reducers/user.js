import {GET_USER, GET_USERS, EDIT_USER} from '../constants/actionTypes'
// reducers are functions - logics

// posts - is a state
const userReducers = (users = [], action) => {
    switch(action.type){
        case GET_USERS:
            return action.payload;
        case GET_USER:
            // return action.payload;
            return { ...users, users: action.data, loading: false, errors: null };
        case EDIT_USER:
            return users.map((user) => (user._id === action.payload._id ? action.payload : user));
        // case LIKE:
        //     return posts.map((post) => post._id == action.payload._id ? action.payload : post)
        // case CREATE:
        //     return [...posts, action.payload];
        // case DELETE:
        //     return posts.filter((post) => post._id != action.payload)
        default:
            return users;

    }
}

export default userReducers
