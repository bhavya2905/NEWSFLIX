import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import CommentSection from "../components/CommentSection";
import Navbar from "../components/Navbar";
import Newsapi from "../components/Newsapi";
import { useParamsValue } from "../components/ParamsContext";
import TextToSpeech from "../components/TextSpeech";
import RelatedNews from "../components/RelatedNews";

export default function Articles({news}) {

  const { id } = useParams();
  let arr,articles;

  
  if(news.length){
    const items = news.filter((e) => e._id == id);
    localStorage.setItem("article", JSON.stringify(items));
    articles = items;
  }else{
    const storedId = localStorage.getItem("article");
      if (storedId) {
        arr = JSON.parse(storedId);
        articles = arr;
      }
  }
  


  // const [articles, setArticles] = useState(items);

  // useEffect(() => {
  //   localStorage.setItem("article", JSON.stringify(items));
  //   setArticles(items);
  // }, [news]);

  // if (news.length == 0) {
  //   const storedId = localStorage.getItem("article");
  //   if (storedId) {
  //     arr = JSON.parse(storedId);
  //     setArticles(arr);
  //   }
  // }
 const isScrolled = true;
  // const [isScrolled, setIsScrolled] = useState(true);

  // window.onscroll = () => {
  //   setIsScrolled(window.pageYOffset === 0 ? false : true);
  //   return () => (window.onscroll = null);
  // };

  return (
    <Container>
      <Navbar isScrolled={isScrolled} />
      <div className="container" style={{ marginTop: "100px" }}>
        <h3>
          <u>
            {articles.length == 0
              ? arr[0].caption.toUpperCase()
              : articles[0].caption.toUpperCase()}
          </u>
        </h3>
        <div className="d-flex justify-content-center align-items-center flex-wrap my-3">
          <div className="my-3 p-3" style={{ width: "600px", boxShadow: "2px 2px 10px red", borderRadius: "10px" }}>
            <h5 className="my-2">{articles.length == 0 ? arr[0].title : articles[0].title}</h5>
            <div className="d-flex justify-content-center align-items-center">
              <img src={articles.length == 0 ? arr[0].selectedFile : articles[0].selectedFile} alt="Image Not Found" style={{ width: "100%", height: "300px", objectFit: "cover" }} />
            </div>
            <TextToSpeech text={articles.length == 0 ? arr[0].description : articles[0].description} />
          </div>
          <div className="ml-3">
            <h3>Related News</h3>
            <RelatedNews currentArticle={articles.length == 0 ? arr[0] : articles[0]}/>
          </div>
        </div>
        <CommentSection post={articles.length == 0 ? arr[0] : articles[0] } />
      </div>
    </Container>
  );
}

const Container = styled.div`
  .content {
    margin: 2.3rem;
    margin-top: 8rem;
    gap: 3rem;
  }
`;
