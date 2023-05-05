import React, { useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import backgroundImage from "../assets/cover.png";
import MovieLogo from "../assets/homeTitle.png";

import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";
import { useNavigate } from "react-router-dom";


import { FaPlay } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";
import Slider from "../components/Slider";

import Footer from "../components/Footer";


// import Slider from "../components/Slider";

const Newsflix = ({news}) => {
    const [isScrolled, setIsScrolled] = useState(true);
    // const movies = useSelector((state) => state.netflix.movies);
    // const genres = useSelector((state) => state.netflix.genres);
    // const genresLoaded = useSelector((state) => state.netflix.genresLoaded);
 
    const [email, setEmail] = useState(undefined);
    
    const navigate = useNavigate();
   
 
    
  
  
    // useEffect(() => {
    //   if (genresLoaded) {
    //     dispatch(fetchMovies({ genres, type: "all" }));
    //   }
    // }, [genresLoaded]);
  
    onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (currentUser) {
        setEmail(currentUser.email);
        localStorage.setItem('currUser',currentUser.email);
      } else navigate("/login");
    });
  
    // window.onscroll = () => {
    //   setIsScrolled(window.pageYOffset === 0 ? false : true);
    //   return () => (window.onscroll = null);
    // };

  return (
    <Container>
      <Navbar isScrolled={isScrolled} show={true}/>
      <div className="hero">
        <img
            src={backgroundImage}
            alt="background"
            className="background-image"
            />
        <div className="container">
          <div className="logo">
            <img src={MovieLogo} alt="Movie Logo" />
          </div>
          <div className="buttons flex">
            <button
              onClick={() => navigate("/player")}
              className="flex j-center a-center"
            >
              <FaPlay />
              Play
            </button>
            <button className="flex j-center a-center" onClick={() => { navigate("/newsvideo/NDTV")}}>
              <AiOutlineInfoCircle />
              Watch Videos
            </button>
          </div>
         </div>
      </div>
      <Slider movies={news} email={email} />
      <Footer/>
    </Container>
  )
}

const Container = styled.div`
  background-color: black;
  .hero {
    position: relative;
    .background-image {
      filter: brightness(60%);
    }
    img {
      height: 100vh;
      width: 100vw;
    }
    .container {
      position: absolute;
      bottom: 5rem;
      .logo {
        img {
          width: 100%;
          height: 100%;
          margin-left: 5rem;
        }
      }
      .buttons {
        margin: 5rem;
        gap: 2rem;
        button {
          font-size: 1.4rem;
          gap: 1rem;
          border-radius: 0.2rem;
          padding: 0.5rem;
          padding-left: 2rem;
          padding-right: 2.4rem;
          border: none;
          cursor: pointer;
          transition: 0.2s ease-in-out;
          &:hover {
            opacity: 0.8;
          }
          &:nth-of-type(2) {
            background-color: rgba(109, 109, 110, 0.7);
            color: white;
            svg {
              font-size: 1.8rem;
            }
          }
        }
      }
    }
  }
`;

export default Newsflix
