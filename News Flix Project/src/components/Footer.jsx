import React from "react"
import styled from "styled-components"


const Footer = () => {
  return (
    <Container>
      <div className='legal  '>
        <div className='container flexSB'>
          <p>© all rights reserved NEWSFLIX</p>
    
        </div>
      </div>
    </Container>
  )
}

const Container = styled.div`
footer {
    background-color: #000;
    color: #fff;
    padding: 50px 0;
    margin-top: 50px;
  }
  footer .container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 30px;
  }
  footer .logo p {
    margin: 20px 0;
  }
  footer h3 {
    margin-bottom: 20px;
    font-weight: 500;
  }
  footer .item {
    display: flex;
    margin-bottom: 30px;
  }
  footer .item img {
    width: 80px;
    height: 80px;
    object-fit: cover;
  }
  footer .item p {
    padding: 10px 20px;
  }
  
  footer ul li {
    margin-bottom: 20px;
    border-bottom: 2px solid rgba(255, 255, 255, 0.3);
    padding-bottom: 5px;
    display: flex;
    justify-content: space-between;
    position: relative;
  }
  footer ul li:nth-last-child(1) {
    border-bottom: none;
  }
  footer ul li span::before {
    content: ">";
    top: 0;
    left: 0;
    margin-right: 10px;
  }
  .legal {
    padding: 15px;
    background-color: #000;
    color: grey;
    border-top: 2px solid rgba(255, 255, 255, 0.3);
  }
  .legal i {
    color: red;
  }
  @media screen and (max-width: 768px) {
    footer .container {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  
`

export default Footer
