import axios from 'axios';
const url='http://localhost:5000/api/admin';


export const fetchPosts = () => axios.get(url);
export const createPost = (newPost) =>axios.post(url, newPost);
export const comment = (val,id) => axios.post(`${url}/comment/${id}`,{val});
export const delcomment = (val,id) => axios.post(`${url}/deletecomment/${id}`,{val});
export const recommendCat = (val,cat) => axios.post(`${url}/recommend/${cat}`,{val});
export const derecommendCat = (val,cat) => axios.post(`${url}/derecommend/${cat}`,{val});

export const update = (val,id) => axios.post(`${url}/update/${id}`,{val});
export const deleteArt = (id) => axios.get(`${url}/delete/${id}`);


