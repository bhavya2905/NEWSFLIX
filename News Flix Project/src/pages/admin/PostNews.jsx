import styled from 'styled-components'
import FileBase from 'react-file-base64'
import { useDispatch } from 'react-redux'
import { createPosts } from '../../actions/posts'
import { Menu } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import Siderf from './Siderf';
import Layout, { Content } from 'antd/es/layout/layout'
import React, { useEffect, useState } from 'react'
import InputGroup from 'react-bootstrap/InputGroup';
import Alert from 'react-bootstrap/Alert';
import { Form, Button, Col, Row } from 'react-bootstrap';


export default function PostNews() {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [title, setTitle] = useState("Create an Article!");
const [postData,setPostData] = useState({ 
  title:"",
  description:"",
  caption:"",
  selectedFile:""
})

const dispatch = useDispatch();

 const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(createPosts(postData));
    setPostData({ 
      title:"",
      description:"",
      caption:"",
      selectedFile:""
    });
 }
 
 const clear= ()=>{
    setPostData({ 
      title:"",
      description:"",
      caption:"",
      selectedFile:""
    });
 }
 const handleChange = (event) => {
  // setPostData({...postData,selectedFile : event.target.value})
  // console.log(event.target.file);
  const selectedFile = event.target.file[0];
  setFile(selectedFile);
  if (selectedFile) {
    const reader = new FileReader();
    reader.onload = (event) => {
      setPreviewUrl(event.target.result);
    };
    reader.readAsDataURL(selectedFile);
  } else {
    setPreviewUrl(null);
  }
};

 return (
  <Layout>
      <Siderf />
      <Content>
          <Container>
              <Alert  variant="primary">
                {title}
              </Alert>
              <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">Title</InputGroup.Text>
              <Form.Control
              placeholder="Enter the Title"
              aria-label="Username"
              aria-describedby="basic-addon1"
              value={postData.title}
              onChange={(e) => setPostData({...postData,title : e.target.value})}
     
              />
              </InputGroup>
              <InputGroup className="mb-3">
              <InputGroup.Text>Description</InputGroup.Text>
              <Form.Control as="textarea" 
              aria-label="Description"
              value={postData.description}
              onChange={(e) => setPostData({...postData,description : e.target.value})}
               />
              </InputGroup>
              <InputGroup className="mb-3">                                                
              <InputGroup.Text>Category</InputGroup.Text>
              <Form.Select 
              value={postData.caption} 
              onChange={(e) => setPostData({...postData,caption : e.target.value})} >
                  <option value="">Select</option>
                  <option value="sports">Sports</option>
                  <option value="politics">Politics</option>
                  <option value="weather">Weather</option>
                  <option value="health">Health</option>
                  {/* <option value="health">Health</option> */}

              </Form.Select>
              </InputGroup>
              <Form.Group controlId="formFile" className="mb-3">
      <Form.Label>Upload file</Form.Label>
      <Form.Control type="file" 
      
      onChange={handleChange} 
      // onChange={(e) => setPostData({...postData,selectedFile : e.target.value})}
      />
      {previewUrl && (
        <Row>
          <Col xs={12} sm={6} md={4} lg={3}>
            <img src={previewUrl} className="img-fluid mt-3" />
          </Col>
        </Row>
      )}
    </Form.Group>
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