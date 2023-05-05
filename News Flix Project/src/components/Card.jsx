import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IoPlayCircleSharp, IoPauseCircleSharp } from "react-icons/io5";

import { AiOutlinePlus } from "react-icons/ai";
import { RiThumbUpFill, RiThumbDownFill } from "react-icons/ri";

import { BsCheck } from "react-icons/bs";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";
import { useDispatch } from "react-redux";
import { catCount, deccatCount } from "../actions/posts";

import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default React.memo(function Card({ index, movieData, isLiked = false }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false);
  const [email, setEmail] = useState(undefined);

  const speak = () => {
      // Create a new speech synthesis object
      const synth = window.speechSynthesis;

      // Create a new speech utterance with the text from the div
      const utterance = new SpeechSynthesisUtterance(movieData.description);

      // Set the language to English
      utterance.lang = 'en-US';

      // Speak the utterance
      synth.speak(utterance);

      // Update the state to indicate that speech is in progress
  };

  const stop = () => {
    
    // Stop the speech synthesis
    window.speechSynthesis.cancel();
    // Update the state to indicate that speech is no longer in progress
  };

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) {
      setEmail(currentUser.email);
    } else navigate("/login");
  });

  function artExists(id,arr) {
    return arr.some(function(el) {
      return el._id === id;
    }); 
  }

  const addToList = () => {
    let likedMovies = JSON.parse(localStorage.getItem(`mylist_${email}`)) ?? [];
    if(artExists(movieData._id, likedMovies)){
      toast.error("Already Added to your list!");
    }else {
      likedMovies.push(movieData);
      localStorage.setItem(`mylist_${email}`,JSON.stringify(likedMovies));
      toast.success("Successfully Added to your list!");
    }
  };

  const removeFromList = () => {
    let likedMovies = JSON.parse(localStorage.getItem(`mylist_${email}`)) ?? [];
    likedMovies = likedMovies.filter(news => news._id != movieData._id);
    localStorage.setItem(`mylist_${email}`,JSON.stringify(likedMovies));
    toast.success("Successfully removed from your list!");
    setTimeout("location.reload();",1000);
    
  }
  const articleUrl = `/articles/${movieData._id}`;
  return (
    <Container className="newsCard"
    data-news = {JSON.stringify(movieData)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={movieData.selectedFile}
        alt="card"
        onClick={() => navigate("/player")}
      />

      {isHovered && (
        <div className="hover">
          <div className="image-video-container">
            <img
              src={movieData.selectedFile}
              alt="card"
              onClick={() => {navigate(articleUrl); dispatch(catCount(email, movieData.caption));}}
            />
            
          </div>
          <div className="info-container flex column">
            <h3 className="name" onClick={() => {navigate(articleUrl); dispatch(catCount(email, movieData.caption));}}>
              {movieData.title.slice(0,30)} ...
            </h3>
            <div className="icons flex j-between">
              <div className="controls flex">
                <IoPlayCircleSharp
                  title="Play"
                  onClick={speak}
                />
                <IoPauseCircleSharp
                  title="Pause"
                  onClick={stop}
                />
                <RiThumbUpFill title="Like" onClick={() => { 
                    dispatch(catCount(email, movieData.caption));
                    toast.success("your likes will be used for the recommendation");
                  }}/>
                <RiThumbDownFill title="Dislike" onClick={() => { 
                  dispatch(deccatCount(email, movieData.caption));
                  toast.warning("your dislikes will be used for the recommendation");
                  }} />
                {isLiked ? (
                  <BsCheck
                    title="Remove from List"
                    onClick={removeFromList}
                  />
                ) : (
                  <AiOutlinePlus title="Add to my list"  onClick={addToList} />
                )}
              </div>
              {/* <div className="info">
                <BiChevronDown title="More Info" />
              </div> */}
            </div>
          </div>
        </div>
      )}
      
    </Container>
  );
});

const Container = styled.div`
  max-width: 230px;
  width: 230px;
  height: 100%;
  cursor: pointer;
  position: relative;
  img {
    border-radius: 0.2rem;
    width: 100%;
    height: 100%;
    z-index: 10;
  }
  .hover {
    z-index: 99;
    height: max-content;
    width: 20rem;
    position: absolute;
    top: -18vh;
    left: 0;
    border-radius: 0.3rem;
    box-shadow: rgba(0, 0, 0, 0.75) 0px 3px 10px;
    background-color: #181818;
    transition: 0.3s ease-in-out;
    .image-video-container {
      position: relative;
      height: 140px;
      img {
        width: 100%;
        height: 140px;
        object-fit: cover;
        border-radius: 0.3rem;
        top: 0;
        z-index: 4;
        position: absolute;
      }
      video {
        width: 100%;
        height: 140px;
        object-fit: cover;
        border-radius: 0.3rem;
        top: 0;
        z-index: 5;
        position: absolute;
      }
    }
    .info-container {
      padding: 1rem;
      gap: 0.5rem;
    }
    .icons {
      .controls {
        display: flex;
        gap: 1rem;
      }
      svg {
        font-size: 2rem;
        cursor: pointer;
        transition: 0.3s ease-in-out;
        &:hover {
          color: #b8b8b8;
        }
      }
    }
    .genres {
      ul {
        gap: 1rem;
        li {
          padding-right: 0.7rem;
          &:first-of-type {
            list-style-type: none;
          }
        }
      }
    }
  }
`;