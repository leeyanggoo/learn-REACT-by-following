import axios from 'axios';
const url = 'https://jsonplaceholder.typicode.com';
// export const fetchPosts = (): any => {
//   return async function fetchPostsThunk(dispatch: any, getState: any) {
//     const response = await axios.get(`${url}/posts`);
//     dispatch({ type: 'FETCH_POSTS', payload: response.data });
//   };
// };

export const fetchPosts = (): any => async (dispatch: any, getState: any) => {
  const response = await axios.get(`${url}/posts`);
  dispatch({ type: 'FETCH_POSTS', payload: response.data });
};
