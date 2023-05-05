export default ( posts = [], action ) =>{
    switch(action.type){
        case 'FETCH_ALL':
            return action.payload;
        case 'CREATE':
        case "COMMENT":
        case "DELETE_COMMENT":
        case "RECOMMEND":
        case "UPDATE":
            return [...posts,action.payload];
        
        case "DELETE":
            return posts.filter((post)=> post._id !== action.payload.id);
        case "FETCH_FILTER":
            return posts.slice(1);
        default:
            return posts;
    }
}

