import React,{ useState} from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";

import Header from "../../components/Header";


function AdminLogin() {
  localStorage.setItem('adminUser',"");
    const history=useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const fetchdata = async () => {
      await axios
      .get(
          "http://localhost:5000/api/user/admin/users"
      )
      .then((res) => {localStorage.setItem('userList',JSON.stringify(res.data.users));
      });
  };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios .post("http://localhost:5000/api/user/admin/login",{
                email,password
            })
            .then(res=>{
                if (res.status === 200) {
                  fetchdata();
                  localStorage.setItem('adminUser',email);
                    history("../dashboard");
                  } else {
                    alert("not signed in")
                  }
                  
            })
            .catch(e=>{
                alert("wrong details")
                console.log(e);
            })
        } catch (error) {
            console.log(error)
        }
    }
    return(
      <>
        <Header />
        <Container>
          
          <h2>Admin Login</h2>
          <LoginForm onSubmit={handleSubmit} action="POST">
            <Input
              type="email"
              placeholder="Email or phone number"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit">Sign In</Button>
            <p>Want to become an Admin? <Link to="/admin/signup">Signup</Link></p>
          </LoginForm>
        </Container>
      </>
        
    );
        

}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #000;
`;
const LoginForm = styled.form`
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
  margin-bottom: 1rem;
  border-radius: 0.25rem;
  padding: 0.5rem;
  cursor: pointer;

  &:hover {
    background-color: #b2070a;
  }
`;

export default AdminLogin;