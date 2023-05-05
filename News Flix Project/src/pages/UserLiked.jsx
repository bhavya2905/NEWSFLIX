import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";



export default function UserLiked({movies}){

    const isScrolled = true;
  
    const navigate = useNavigate();
    const dispatch = useDispatch();
  
    const [email, setEmail] = useState(undefined);

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) {
      setEmail(currentUser.email);
      
    } else navigate("/login");
  });

  let likedNews,showNews;
    

    const storedId = localStorage.getItem(`mylist_${email}`);
    if (storedId) {
      showNews = JSON.parse(storedId);
    }
    
  
    // window.onscroll = () => {
    //   setIsScrolled(window.pageYOffset === 0 ? false : true);
    //   return () => (window.onscroll = null);
    // };

    return (<Container>
        
        <Navbar isScrolled={isScrolled} />
        <div className="content flex column">
            <h1>My list</h1>
            <div className="grid flex">
                {showNews?.map((movie,index)=>{
                    return (<Card index={index} movieData={movie} key={movie._id} isLiked={true}/>);
                })}
            </div>
        </div>
    </Container>);
}

const Container =styled.div`
.content {
    margin: 2.3rem;
    margin-top: 8rem;
    gap: 3rem;
    h1 {
      margin-left: 3rem;
    }
    .grid {
      flex-wrap: wrap;
      gap: 1rem;
    }
  }
  `;