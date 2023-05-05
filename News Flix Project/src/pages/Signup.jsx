
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from "styled-components"
import BackgroundImage from '../components/BackgroundImage';
import Header from '../components/Header';
import { firebaseAuth } from '../utils/firebase-config';
import axios from 'axios';
const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] =  useState(false);
  const [formValues, setFormValues] = useState(
    {
        email : "",
        password: "",
    }
  );

    const insertData= (formData)=>{
      axios.post('http://localhost:5000/api/user/details',{ formData})
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
    }

  const handleSignIn = async () => {
    try {
        const {email, password} = formValues;
        const formData ={
          name: email.split('@')[0],
          gender: "",
          email: email,
          mobile: "",
          address: "",
          preferences: "",
        };
        insertData(formData);
        await createUserWithEmailAndPassword(firebaseAuth, email, password);

    } catch (error) {
      alert('Email Id already in use!');
      console.log(error);
    }
  }

  onAuthStateChanged(firebaseAuth, (currentuser) => {
    if(currentuser) navigate("/");
  })

  return (
   <Container showPassword={showPassword}>
        <BackgroundImage />
        <div className="content">
            <Header login />
            <div className="body flex column a-center j-center">
                <div className="text flex column">
                    <h1>Unlimited news, categories, sports, fun</h1>
                    <h4>Read, Listen Anywhere, Anytime.</h4>
                    <h6>Ready to Read? Enter your email to create or restart membership</h6>
                </div>
                <div className="form">
                    <input type="email" placeholder='Email Address' name='email' value={formValues.email} onChange={(e) => setFormValues({...formValues, [e.target.name] : e.target.value})}/>
                    { showPassword && <input type="password" placeholder='password' name='password' value={formValues.password} onChange={(e) => setFormValues({...formValues, [e.target.name] : e.target.value})} /> }
                    { !showPassword && <button onClick={() => setShowPassword(true)}> Get Started</button> }
                </div>
                <button onClick={handleSignIn}>Sign Up</button>
            </div>
        </div>
        
   </Container>
  )
}

const Container = styled.div`
  position: relative;
  .content {
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    height: 100vh;
    width: 100vw;
    display: grid;
    grid-template-rows: 15vh 85vh;
    .body {
      gap: 1rem;
      .text {
        gap: 1rem;
        text-align: center;
        font-size: 2rem;
        h1 {
          padding: 0 25rem;
        }
      }
      .form {
        display: grid;
        grid-template-columns: ${({ showPassword }) =>
          showPassword ? "1fr 1fr" : "2fr 1fr"};
        width: 60%;
        input {
          color: black;
          border: none;
          padding: 1.5rem;
          font-size: 1.2rem;
          border: 1px solid black;
          &:focus {
            outline: none;
          }
        }
        button {
          padding: 0.5rem 1rem;
          background-color: #e50914;
          border: none;
          cursor: pointer;
          color: white;
          font-weight: bolder;
          font-size: 1.05rem;
        }
      }
      button {
        padding: 0.5rem 1rem;
        background-color: #e50914;
        border: none;
        cursor: pointer;
        color: white;
        border-radius: 0.2rem;
        font-weight: bolder;
        font-size: 1.05rem;
      }
    }
  }
`;

export default Signup
