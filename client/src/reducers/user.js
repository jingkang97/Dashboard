import {GET_USER, GET_USERS, EDIT_USER} from '../constants/actionTypes'
// reducers are functions - logics

// posts - is a state
export default (posts = [], action) => {
    switch(action.type){
        case GET_USERS:
            return action.payload;
        case GET_USER:
            return action.payload;
        case EDIT_USER:
            return posts.map((post) => (post._id === action.payload._id ? action.payload : post));
        // case LIKE:
        //     return posts.map((post) => post._id == action.payload._id ? action.payload : post)
        // case CREATE:
        //     return [...posts, action.payload];
        // case DELETE:
        //     return posts.filter((post) => post._id != action.payload)
        default:
            return posts;

    }
}