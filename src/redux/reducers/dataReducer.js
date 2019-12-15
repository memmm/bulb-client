import {
  SET_POSTS,
  LIKE_POST,
  UNLIKE_POST,
  LOADING_DATA,
  DELETE_POST,
  POST_POST,
  SET_POST,
  SUBMIT_COMMENT
} from "../types";

const initialState = {
  posts: [],
  POST: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true
      };
    case SET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false
      };
    case SET_POST:
      return {
        ...state,
        POST: action.payload
      };
    case LIKE_POST:
    case UNLIKE_POST:
      let index = state.posts.findIndex(
        POST => POST.POSTId === action.payload.POSTId
      );
      state.posts[index] = action.payload;
      if (state.POST.POSTId === action.payload.POSTId) {
        state.POST = action.payload;
      }
      return {
        ...state
      };
    case DELETE_POST:
      index = state.posts.findIndex(POST => POST.POSTId === action.payload);
      state.posts.splice(index, 1);
      return {
        ...state
      };
    case POST_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts]
      };
    case SUBMIT_COMMENT:
      return {
        ...state,
        POST: {
          ...state.POST,
          comments: [action.payload, ...state.POST.comments]
        }
      };
    default:
      return state;
  }
}
