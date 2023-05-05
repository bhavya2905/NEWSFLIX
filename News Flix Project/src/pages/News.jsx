import React,{useState} from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Newsapi from "../components/Newsapi";
export default function News({category}){
  const [isScrolled, setIsScrolled] = useState(false);
  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };
  
    return(
    <Container>
        <Navbar isScrolled={isScrolled}/>
        <Newsapi category={category}/>
        
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