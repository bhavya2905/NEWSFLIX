import React, { useEffect, useState } from 'react'
import InputGroup from 'react-bootstrap/InputGroup';
import styled from 'styled-components';
import Alert from 'react-bootstrap/Alert';
import { Form, Button, Col, Row } from 'react-bootstrap';
import { Layout } from 'antd';
import Siderf from './Siderf';
import { Content } from 'antd/es/layout/layout';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export const EditAdmin = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id'); 
    const link =`http://localhost:5000/api/user/admin/editadmin/${id}`;
    
    const [admin, setAdmin] =useState(
        {
            firstName: "",
            lastName: "",
            email: "",
            password: ""
        }
    )
    const [user,setUser] = useState([]);
    const fetchdata = async () => {
        await axios
        .get(
            "http://localhost:5000/api/user/admin/users"
        )
        .then((res) => {
          const currUser = res.data.users.filter((e)=> e._id == id);
          setUser(currUser);
          
          setAdmin(
            {
              firstName: currUser[0].name.split(' ')[0],
              lastName: currUser[0].name.split(' ')[1],
              email: currUser[0].email,
              password: currUser[0].password
          }
          )
        });
    };
    useEffect(()=>{
        fetchdata();
    },[]);
    const savedata = async () => {
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
          // console.log(firstName, lastName, email, password);
          await axios.post(link,{
              admin
          }).then(res=>{
              if (res.status >= 200 && res.status < 300) {
                savedata();
                alert('user updated')
                
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
    const clear=() => {

    };
  return (
    <Layout>
        <Siderf />
        <Content>
        <Container>
                <Alert  variant="primary">
                  Update details
                </Alert>
                <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">FirstName</InputGroup.Text>
                <Form.Control
                placeholder="Enter the First Name"
                aria-label="Username"
                aria-describedby="basic-addon1"
                value={admin.firstName}
                onChange={(e) => setAdmin({...admin,firstName : e.target.value})}
       
                />
                </InputGroup>
                <InputGroup className="mb-3">
                <InputGroup.Text>Last name</InputGroup.Text>
                <Form.Control 
                placeholder="Enter the Last Name"
                aria-label="Description"
                value={admin.lastName}
                onChange={(e) => setAdmin({...admin,lastName : e.target.value})}
                 />
                </InputGroup>
                <InputGroup className="mb-3">                                                
                <InputGroup.Text>Email</InputGroup.Text>
                <Form.Control 
                placeholder="Enter the email"
                aria-label="Description"
                value={admin.email}
                disabled="true"
                onChange={(e) => setAdmin({...admin,email : e.target.value})}
                 />
                </InputGroup>
                <InputGroup className="mb-3">                                                
                <InputGroup.Text>password</InputGroup.Text>
                <Form.Control 
                placeholder="Enter the email"
                aria-label="Description"
                value={admin.password}
                onChange={(e) => setAdmin({...admin,password : e.target.value})}
                 />
                </InputGroup>
      <Button type="submit" variant="success" style={{marginRight:"20px"}} onClick={handleSubmit}>Submit form</Button>
      <Button variant="secondary" onClick={clear}>Clear form</Button>
    </Container>
        </Content>
    </Layout>
    
  )
}
const Container = styled.div`
    padding:30px;
`

