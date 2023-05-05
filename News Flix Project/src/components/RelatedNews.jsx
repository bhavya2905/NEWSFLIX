import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { IoMdTime } from "react-icons/io";
import moment from "moment";
import Button from "react-bootstrap/esm/Button";
import { deletePosts } from "../actions/posts";

const RelatedNews = ({ currentArticle }) => {
  const dispatch = useDispatch();
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const category = urlParams.get('title'); 
 


  const posts = useSelector((state) => state.posts);
  let relatedPosts = '';
  const length = currentArticle ? 3 : posts.length;
  if(currentArticle){
     relatedPosts = posts.filter(
      (post) => (post._id !== currentArticle._id && post.caption == currentArticle.caption)
    );
  }else{
    relatedPosts = posts.filter(
      (post) => ( post.caption == category)
    );
  }
 

  return (
    <Container>
      {relatedPosts.slice(0, length).map((post,i) => (
      <List key={i}>
        <Link to={`/articles/${post._id}`} key={post._id}>
          <div className="related-news-card">
            <div className="related-news-img-container">
              <img src={post.selectedFile} alt={post.title} />
            </div>
            <div className="related-news-text">
              <h6>{post.title}</h6>
              <div className="related-news-info">
                <span>
                  <IoMdTime />
                  {moment(post.createdAt).fromNow()}
                </span>
              </div>
            </div>
          </div>
        </Link> 
        {category ? (
        <div style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", margin:"10px"}}>
        <Button style={{height:"fit-content", marginBottom:"10px"}} size="sm" variant="info" href={`/updatepost?id=${post._id}`}>Edit</Button>
        <Button style={{height:"fit-content"}} size="sm" variant="danger" id={post._id} onClick={(e)=> {
            dispatch(deletePosts(e.target.id));
          }
        }>Delete</Button>
        </div>
        ) : ''}
       
      </List>
        
      ))}

     

    </Container>
  );
};

const List = styled.div`
  display:flex;
`

const Container = styled.div`
  margin-top: 50px;

  h3 {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
  }

  .related-news-card {
    display: flex;
    margin-bottom: 20px;
    border: 1px solid #ddd;
    border-radius: 10px;
    overflow: hidden;

    &:hover {
      box-shadow: 0px 5px 15px #ddd;
      transition: all 0.2s ease-in-out;
    }
  }

  .related-news-img-container {
    width: 100px;
    height: 100px;
    margin-right: 10px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .related-news-text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-right: 10px;
    flex: 1;

    h6 {
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 10px;
    }

    .related-news-info {
      font-size: 12px;
      color: #777;
      display: flex;
      align-items: center;

      span {
        margin-right: 5px;
      }
    }
  }
`;

export default RelatedNews;
