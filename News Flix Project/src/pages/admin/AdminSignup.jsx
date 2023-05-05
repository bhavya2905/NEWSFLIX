import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import Header from "../../components/Header";

const AdminSignup = () => {
    const history=useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        // console.log(firstName, lastName, email, password);
        await axios.post("http://localhost:5000/api/user/admin/signup",{
            firstName,lastName,email,password
        }).then(res=>{
            if (res.status >= 200 && res.status < 300) {
                history("../dashboard");
              } else if(res.status === 400){
                alert("user already signed up")
              }else{
                alert("sign up failed");
              }
              
        }).catch(e=>{
            alert("wrong details")
            console.log(e);
        })
    } catch (error) {
        console.log(error)
    }
  };

  return (
    <>
    <Header />
      <Container>
      
        <h2>Admin Registration</h2>
        <SignupForm onSubmit={handleSubmit} action="POST">
          <Input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit">Sign Up</Button>
          <p>Back to <Link to="/admin/login">Login</Link> page</p>
        </SignupForm>
      
    </Container>
    </>
    
  );
};

const Container = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
height: 100vh;
background-color: #000;
`;

const SignupForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #333;
  padding: 2rem;
  border-radius: 0.5rem;
`;

const Input = styled.input`
width: 100%;
border: none;
border-radius: 0.25rem;
padding: 0.5rem;
margin-bottom: 1rem;
background-color: #333;
color: #fff;
cursor: pointer;
&:focus {
  outline: none;
}
`;

const Button = styled.button`
width: 100%;
background-color: #e50914;
color: #fff;
border: none;
border-radius: 0.25rem;
padding: 0.5rem;
margin-bottom: 1rem;
cursor: pointer;

&:hover {
  background-color: #b2070a;
}
`;

export default AdminSignup;
