import React, { useEffect, useState } from 'react'
import {  ScrollRestoration, useNavigate } from 'react-router-dom'
import { BsPencilSquare } from 'react-icons/bs';
import { Col, InputGroup, Form, Row } from 'react-bootstrap';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '../utils/firebase-config';
import axios from 'axios';

const SettingsPage = () => {
  const navigate=useNavigate();
  const [email,setEmail]= useState();

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) {
      setEmail(currentUser.email);
    } else navigate("/login");
  });
 

  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    email: '',
    mobile: '',
    address: '',
    preferences: '',
  });

  // useEffect(()=>{
  //   getData();
  //   // const storageValues = localStorage.getItem(`settings_${email}`);
  //   // if(storageValues){
  //   //   const dataValue = JSON.parse(storageValues);
  //   //   setFieldValues([
  //   //     {0:dataValue.name,1:dataValue.email, 2: dataValue.address},
  //   //     {0:'******',1:'Click Edit to reset password ', 2: 'Click Edit to confirm reset password'},
  //   //     {0:dataValue.preferences},
  //   //     {0:'Click Edit button to delete the User History'},
  //   //   ])
  //   // }
  // },[email]);

  const options=[
    {
      header:{
        name:"Account",
      },
      values:[
        {
          name: "Name",
          description: formData.name ? 't' : 'x',
          tags:'text',
        },
        {
          name: "Address",
          description:formData.name,
          tags:'textArea',
        },
        {
          name: "Date of Birth",
          description: formData.name,
          tags:'calender',
        },
      ]
    },
    {
      header:{
        name:"Password",
      },
      values:[
        {
          name: "current Password",
          description: "current users password",
          tags:'password',
        },
        {
          name: "New Password",
          description: "new users password",
          tags:'password',
        },
        {
          name: "confirm Password",
          description: "confirm the new users password",
          tags:'password',
        },
      ]
    },
    {
      header:{
        name:"Preferences",
      },
      values:[
        {
          name: "Prefered category",
          description: formData.preferences,
          tags:'select',
        }
      ]
    },
    {
      header:{
        name:"Clear History",
      },
      values:[
        {
          name: "Clear history",
          description: "current users password",
          tags:'button',
        }
      ]
    },
  ]
  const [visibleOptions, setVisibleOptions]=useState(options);
  
  const handleBack=()=>{
    navigate('/');
  }


    
  const onChange=(e)=>{
    e.preventDefault();
    const value = e.target.value;
    console.log("value", value);

    if(value.trim().length ===0){
      setVisibleOptions(options);
      return; 
    }
     const returnedItems = [];
     visibleOptions.forEach((option,index) => {
      const foundOptions =option.values.filter(item=>{
        return item.name.toLocaleLowerCase().search(value.trim().toLowerCase())!==-1 ||
         item.description.toLocaleLowerCase().search(value.trim().toLowerCase())!==-1;
       });

       returnedItems[index]={
        header:{
          name:option.header.name,
        },
        values:foundOptions,
       };

       if( option.header.name.toLocaleLowerCase()
       .search(value.trim()
       .toLowerCase())!==-1){
        returnedItems[index]={
          header:{
            name:option.header.name,
          },
          values: options[index].values,
         };
       }

     });
     
     setVisibleOptions(returnedItems);

  };
  const [hidden, setHidden] = useState(Array(visibleOptions.length).fill().map(() => Array().fill(1)));
  const [fieldValues, setFieldValues] = useState(Array(visibleOptions.length).fill().map(() => Array().fill('')));

  // const handleToggle = (i,j) => {
  //   const newHidden = [...hidden];
  //   newHidden[i][j] = !newHidden[i][j];
  //   console.log(newHidden);
  //   setHidden(newHidden);
  // };

  // const insertData= (formData)=>{
  //   axios.post('http://localhost:5000/api/user/details',{ formData})
  //   .then(response => {
  //     console.log(response.data);
  //   })
  //   .catch(error => {
  //     console.error(error);
  //   });
  // }

  const getData= async ()=>{
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
  // getData();
 
  return (
    <div className='SettingsPage'>
      <div className='container my-5'>
        <h1>
          <span>
            <button className='btn btn-secondary' onClick={handleBack}>
              {" "}
              <span>&lt;</span> Back{" "}
            </button>{" "}
            Settings
          </span>
        </h1>
        <input type="text" className='form-control mt-5'
        onChange={onChange}
        placeholder='Search...'/>
        <div>
          {visibleOptions.map((option,i) =>(
            <div key={option.header.name} className='mt-5 mt-2'>
              <h3>{option.header.name}</h3>
              <div>
                {option.values.map((value,j)=>(
                <div key={value.name}>
                  <ul className='list-group'>
                    <li className='list-group-item mb-2'>
                      <h6 className={`${hidden[i][j] ? 'd-none': 'font-weight-bold'}`}>  {value.name}</h6>
                      <Row key={j}>
                        <Col sm={11}>
                          {/* <InputGroup className={`mb-3 ${hidden[i][j] ? '' : 'd-none'}`}>
                            <InputGroup.Text id="basic-addon1">{value.name}</InputGroup.Text>
                            <Form.Control
                              placeholder={fieldValues[i][j]}
                              aria-label="Username"
                              aria-describedby="basic-addon1"
                            />
                          </InputGroup> */}

                          <p className={`${hidden[i][j] ? 'd-none': ''}`}>{fieldValues[i][j]}</p>
                        </Col>
                        {/* <Col sm={1}>
                          <BsPencilSquare onClick={() => handleToggle(i,j)} />
                        </Col> */}
                      </Row>
                      
                    </li>
                  </ul>
                  
                  </div>
                
                ))}

              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;