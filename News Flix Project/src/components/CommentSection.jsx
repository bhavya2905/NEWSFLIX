import React, { useState } from "react";
import { getAuth } from "firebase/auth";
import { useDispatch } from "react-redux";
import { postComment } from "../actions/posts";

const CommentSection = ({post}) => {
  
  const [comments, setComments] = useState(post?.comments);
  const [newComment, setNewComment] = useState("");
  const auth = getAuth();
  const userName= auth.currentUser?.email;
  const dispatch=useDispatch();
  const handleAddComment = () => {
    if(newComment){
      const finalComment = `${userName}:${newComment}`;
    
      dispatch(postComment(finalComment, post._id));
      setComments([...comments, finalComment]);
      setNewComment("");
    }
    
  };

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };
  

  return (
    <div style={{ width: "70%", marginLeft:"15%"}}>
      <h2 className="text-2xl font-bold mb-4">Comments</h2>
      <div className="d-flex mb-4">
        <textarea
          id="new-comment"
          className="form-control me-2"
          value={newComment}
          onChange={handleCommentChange}
          style={{ width: "80%" }}
        ></textarea>
        <button className="btn btn-danger" onClick={ handleAddComment} style={{ width: "20%" }}>
          Post
        </button>
      </div>
      <div className="comments-scrollable bg-transparent">
        {comments.map((comment, index) => (
          <div key={index} className="d-flex mb-2 p-2" style={{ backgroundColor: "black" }}>
            <div className="rounded-circle bg-secondary text-white text-center" style={{ width: "40px", height: "40px", lineHeight: "40px", marginRight: "10px", fontSize: "20px" }}>
              {comment[0].toUpperCase()}
            </div>
            <div style={{ width: "calc(100% - 40px)", padding:"2px" }}>{comment.split(':')[1]}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
