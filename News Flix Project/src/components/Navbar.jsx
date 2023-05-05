import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

import newsflix from "../assets/newsflix.png"
import { firebaseAuth } from "../utils/firebase-config";
import {  FaSearch } from "react-icons/fa";
import { AiOutlineLogout, AiOutlineSetting } from 'react-icons/ai';
import { ToastContainer } from "react-toastify";
import SelectDropdown from "./SelectDropdown";



const Navbar = ({ isScrolled , show}) => {
    const navigate = useNavigate();
   
    const [searchItem,setSearchItem]=useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [inputHover, setInputHover] = useState(false);
    const links = [
      { name: "Home", link: "/" },
      { name: "Top News", link: "/general" },
      { name: "Business", link: "/business" },
      { name: "Sports", link: "/sports" },
      { name: "My List", link: "/mylist" },
      
    ];
  
    const auth = getAuth();
    const username= auth.currentUser?.email || 'o';
   
    onAuthStateChanged(firebaseAuth, (currentUser) => {
        if (!currentUser) navigate("/login");
        // else setUsername(currentUser.email);
      });
      const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleLogout = () => {
    // Perform logout action
    signOut(firebaseAuth)
  };

  const handleSettings = () => {
    // Perform settings action
    navigate('/settingspage');
  };
  

  const handleSearch = (e)=>{
    setSearchItem(e.target.value.toLowerCase());
    const heroSection = document.querySelector('.hero');
    heroSection.style.display= 'none';
    const cardSection = document.querySelectorAll('.newsCard');
    cardSection.forEach(element => {
      const newsData= JSON.parse(element.getAttribute('data-news'));
      if(newsData.title.toLowerCase().includes(searchItem) || newsData.description.toLowerCase().includes(searchItem) ||newsData.caption.toLowerCase().includes(searchItem)){
        element.setAttribute('style', 'display:block');
      }else{
        element.setAttribute('style', 'display:none');
      }
    });
  }

  return (
    <Container>
      <nav className={`${isScrolled ? "scrolled" : ""} flex`}>
        
        <div className="left flex a-center">
          <div className="brand flex a-center j-center">
            <img src={newsflix} alt="Logo" />
          </div>
          <ul className="links flex">
            {links.map(({ name, link }) => {
              return (
                <li key={name}>
                  <Link to={link}>{name}</Link>
                </li>
              );
            })}
            <li><SelectDropdown/></li>
          </ul>
          
        </div>
        <div className="right flex a-center">
          {
            show && 
            <div className={`search ${showSearch ? "show-search" : ""}`}>
            <button
              onFocus={() => setShowSearch(true)}
              onBlur={() => {
                if (!inputHover) {
                  setShowSearch(false);
                }
              }}
            >
              <FaSearch />
            </button>
            <input
              type="text"
              placeholder="Search"
              onMouseEnter={() => setInputHover(true)}
              onMouseLeave={() => {
                setInputHover(false);
                if(searchItem.length<1){
                  const heroSection = document.querySelector('.hero');
                  heroSection.style.display= 'block';
                  const cardSection = document.querySelectorAll('.newsCard');
                  cardSection.forEach(element => {
                    element.setAttribute('style', 'display:block');
                  });
                }
                
              }}
              onBlur={() => {
                setShowSearch(false);
                setInputHover(false);
              }}
              onChange={handleSearch}
            />
          </div>
          }
          
          {/* <button onClick={() => signOut(firebaseAuth)}>
            <FaPowerOff />
          </button> */}
          <div style={{
            position: 'relative',
            display: 'inline-block'
          }}>
            <div
              style={{
                width: '30px',
                height: '30px',
                cursor: 'pointer',
                borderRadius: '50%',
                backgroundColor: '#007bff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px',
                color: '#fff'
              }}
              onClick={toggleMenu}
            >
              {username[0].toUpperCase()}
            </div>
            {showMenu && (
              <div className="mn"
                style={{
                  position: 'absolute',
                  top: '30px',
                  right: 0,
                  backgroundColor: '#fff',
                  border: '1px solid #ccc',
                  borderRadius: '5px',
                  padding: '5px',
                  zIndex: 1
                }}
              >
                <div className="Btn" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <button className="btn"onClick={handleLogout}>
                  <AiOutlineLogout style={{ marginRight: '5px' }} /> Logout
                </button>
                <button className="btn"onClick={handleSettings}>
                  <AiOutlineSetting style={{ marginRight: '5px' }} /> Settings
                </button>
              </div>
              </div>
            )}
          </div>
        </div>
        
      </nav>
      <ToastContainer/>
    </Container>
  )
}

const Container = styled.div`
  .scrolled {
    background-color: black;
  }
  nav {
    position: sticky;
    top: 0;
    height: 6.5rem;
    width: 100%;
    justify-content: space-between;
    position: fixed;
    top: 0;
    z-index: 2;
    padding: 0 4rem;
    align-items: center;
    transition: 0.3s ease-in-out;
    .left {
      gap: 2rem;
      .brand {
        img {
          height: 4rem;
        }
      }
      .links {
        list-style-type: none;
        gap: 2rem;
        li {
          a {
            color: white;
            text-decoration: none;
          }
        }
      }
    }
    .right {
      gap: 1rem;
      button {
        background-color: transparent;
        border: none;
        cursor: pointer;
        &:focus {
          outline: none;
        }
        svg {
          color: #f34242;
          font-size: 1.2rem;
        }
      }
      .search {
        display: flex;
        gap: 0.4rem;
        align-items: center;
        justify-content: center;
        padding: 0.2rem;
        padding-left: 0.5rem;
        button {
          background-color: transparent;
          border: none;
          &:focus {
            outline: none;
          }
          svg {
            color: white;
            font-size: 1.2rem;
          }
        }
        input {
          width: 0;
          opacity: 0;
          visibility: hidden;
          transition: 0.3s ease-in-out;
          background-color: transparent;
          border: none;
          color: white;
          &:focus {
            outline: none;
          }
        }
      }
      .show-search {
        border: 1px solid white;
        background-color: rgba(0, 0, 0, 0.6);
        input {
          width: 100%;
          opacity: 1;
          visibility: visible;
          padding: 0.3rem;
        }
      }
    .mn{
      .Btn{
        .btn{
        cursor: pointer;
        color: black;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 5px 10px;
        border-radius: 5px;
        transition: background-color 0.3s ease;

        &:hover {
          background-color: #f00;
          color: #fff;
          svg {
            color: #fff;
          }
        }
        svg {
          margin-right: 5px;
          transition: color 0.3s ease;
        }
      }
      }
    }
    }
  }
`;

export default Navbar
