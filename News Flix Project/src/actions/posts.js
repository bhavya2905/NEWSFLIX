import * as api from"../api";

export const getPosts = () => async (dispatch) => {
    try {
        const { data } = await api.fetchPosts();
        dispatch({type:"FETCH_ALL", payload: data});
       
    } catch (error) {
        console.log(error.message);
    }
}


export const createPosts =(post) =>async(dispatch) =>{
    try {
        const { data } = await api.createPost(post);
        
        dispatch({type:"CREATE", payload: data});
    } catch (error) {
        console.log(error.message);
    }
}

export const postComment = (val,id) => async(dispatch) =>{
    try {
        const {data} = await api.comment(val,id);
        dispatch({type:"COMMENT", payload: data});
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteComment = (val,id) => async(dispatch) =>{
    try {
        const {data} = await api.delcomment(val,id);
        dispatch({type:"DELETE_COMMENT", payload: data});
    } catch (error) {
        console.log(error.message);
    }
}

export const updatePosts = (val,id) => async(dispatch) =>{
    try {
        const {data} = await api.update(val,id);
        dispatch({type:"UPDATE", payload: data});
    } catch (error) {
        console.log(error.message);
    }
}

export const deletePosts = (id) => async(dispatch) =>{
    try {
        const {data} = await api.deleteArt(id);
        dispatch({type:"DELETE", payload: data});
    } catch (error) {
        console.log(error.message);
    }
}


export const catCount = (val, id) => async(dispatch) => {
    try{
        const {data} = await api.recommendCat(val,id);
       
        dispatch({type:"RECOMMEND", payload: data});
    }catch (error) {
        console.log(error.message);
    }
}

export const deccatCount = (val, id) => async(dispatch) => {
    try{
        const {data} = await api.derecommendCat(val,id);
       
        dispatch({type:"RECOMMEND", payload: data});
    }catch (error) {
        console.log(error.message);
    }
}

