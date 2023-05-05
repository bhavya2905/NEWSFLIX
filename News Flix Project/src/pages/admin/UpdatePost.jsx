import Layout, { Content } from 'antd/es/layout/layout'
import React, { useEffect, useState } from 'react'
import Siderf from './Siderf'
import InputGroup from 'react-bootstrap/InputGroup';
import styled from 'styled-components';
import Alert from 'react-bootstrap/Alert';
import { Form, Button, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { createPosts, updatePosts } from '../../actions/posts';

function UpdatePost({news}) {
    const [postData,setPostData] = useState({ 
        title:"",
        description:"",
        caption:"",
        selectedFile:""
      })
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [title, setTitle] = useState("Create an Article!");

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const id = urlParams.get('id'); 
    let tableName = `updatedNews_${id}`;
    const updatedPosts = news?.filter(
        (post) => (post._id == id )
      );
      
        if (updatedPosts && updatedPosts.length > 0) {
          localStorage.setItem(tableName, JSON.stringify(updatedPosts));}
  
          const dispatch = useDispatch();

 const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(updatePosts(postData,id));
    localStorage.setItem(tableName, JSON.stringify(postData))
 }
  
  
useEffect(() => {
        let savedData = localStorage.getItem(tableName);
        if (savedData) {
          setTitle("Update the Article!");
          savedData = JSON.parse(savedData);
          setPostData({
            title: savedData[0].title,
            description: savedData[0].description,
            caption: savedData[0].caption,
            selectedFile: savedData[0].selectedFile,
          });
          setFile(savedData[0].selectedFile);
          setPreviewUrl(savedData[0].selectedFile);
        }
        const updatedPosts = news?.filter((post) => post._id == id);
        if (updatedPosts && updatedPosts.length > 0) {
          localStorage.setItem(tableName, JSON.stringify(updatedPosts));
          setTitle("Update the Article!");
          setPostData({
            title: updatedPosts[0].title,
            description: updatedPosts[0].description,
            caption: updatedPosts[0].caption,
            selectedFile: updatedPosts[0].selectedFile,
          });
          setFile(updatedPosts[0].selectedFile);
          setPreviewUrl(updatedPosts[0].selectedFile);
        }
  }, [id]);

  
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
 const clear = ()=>{
    setPostData({
        title:"",
        description:"",
        caption:"",
        selectedFile:""
    })
 }
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

export default UpdatePost