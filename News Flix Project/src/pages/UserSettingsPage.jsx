import React, { useEffect, useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';

import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '../utils/firebase-config';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const UserSettingsPage = () => {
    // const [email,setEmail]= useState();
    const navigate= useNavigate();
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        gender: 'male',
        mobile: '',
        address: '',
        preferences: 'sports',
      });
      
      

      const loadDetails = () => {
        const email = localStorage.getItem('currUser');
        const storageValues = localStorage.getItem(`settings_${email}`);
        if(storageValues != 'undefined'){
            const values = JSON.parse(storageValues);
            setFormData({
                name: values.name,
                email: values.email,
                gender: values.gender,
                mobile:values.mobile ,
                address: values.address,
                preferences: values.preferences,
              });
              
        }else{
            getData(email);
            loadDetails();
        }
      }
      const getData= async (email)=>{
        if(email){
          await axios.get(`http://localhost:5000/api/user/details/${email}`)
          .then(res => {
            localStorage.setItem(`settings_${email}`,JSON.stringify(res.data.isUser));
            
            // console.log(res.data.isUser);
          })
          .catch(error => {
            console.log(error);
          });
        }
        
      }
    const insertData= (formData)=>{
        axios.post('http://localhost:5000/api/user/updatedetails',{ formData})
        .then(response => {
        console.log(response.data);
        getData(response.data.email);
        })
        .catch(error => {
        console.error(error);
        });
    }
      
      const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
      };
      
      const handleSubmit = (event) => {
        event.preventDefault();
        
        const errors = validate();
        if (Object.keys(errors).length === 0) {
          // Submit the form
          insertData(formData);
          localStorage.setItem(`settings_${formData.email}`,JSON.stringify(formData));
          setErrors("");
          toast.success("Updated Successfully!");
         
        } else {
          setErrors(errors);
        }
       
      };
      const validate = () => {
        const errors = {};
    
        if (!formData.mobile) {
          errors.mobile = "Mobile number is required";
        } else if (!/^[0-9]{10}$/.test(formData.mobile)) {
          errors.mobile = "Mobile number is invalid";
        }
    
        return errors;
      };
      
      
   
  const handleBack=()=>{
    navigate('/');
  }
 
  

//   let intervalTime = 1000;
const [intervalTime, setIntervalTime] = useState(1000);

let interval = setInterval(() => {
  // Do something here
  const loadButton = document.getElementById('load_details');
  loadButton.click();

  // Increase interval time after first call
  if (intervalTime === 1000) {
    setIntervalTime(3600000);
    clearInterval(interval);
    interval = setInterval(interval, intervalTime);
  }
}, intervalTime);

  
  

  return (
    <Container className="my-5">
      <h1>
          <span>
            <button className='btn btn-secondary' onClick={handleBack}>
              {" "}
              <span>&lt;</span> Back{" "}
            </button>{" "}
            Settings
            
            <button className='btn btn-secondary d-none' id="load_details" onClick={loadDetails}>
              {" "}
              <span>&lt;</span> Load Details{" "}
            </button>{" "}
          </span>
        </h1>
        <ToastContainer/>
      <hr />
      <Row className="justify-content-md-center">
        <Col md={6}>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicFirstName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </Form.Group>
            
           
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled = {true}
              />
            </Form.Group>
            <Form.Group controlId="formBasicGender">
              <Form.Label>Gender</Form.Label>
              <Form.Control
                as="select"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <option>Male</option>
                <option>Female</option>
                <option>Non-binary</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formBasicMobile">
              <Form.Label>Mobile</Form.Label>
              <Form.Control
                type="mobile"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                isInvalid={!!errors.mobile}
              />
              <Form.Control.Feedback type="invalid">
                {errors.mobile}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formBasicAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formBasicPreferences">
              <Form.Label>Preferences</Form.Label>
              <Form.Control
                as="select"
                name="preferences"
                value={formData.preferences}
                onChange={handleChange}
              >
                <option>Sports</option>
                <option>Business</option>
                <option>Science</option>
                <option>Technology</option>
                <option>Entertainment</option>
                <option>general</option>
                <option>Health</option>
              </Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default UserSettingsPage;
