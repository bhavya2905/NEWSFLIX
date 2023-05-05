import { Layout } from 'antd'
import styled from 'styled-components';
import React, { useEffect, useState } from 'react'
import Siderf from './Siderf'
import CatCard from './CatCard';
import CardGroup from 'react-bootstrap/CardGroup';
import sports from '../../assets/sports.png';
import weather from '../../assets/weather.png';
import politics from '../../assets/politics.png';
import health from '../../assets/health.png';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import { useSelector } from 'react-redux';
import { UsersList } from './UsersList';
import axios from 'axios';
import { FaComment, FaNewspaper, FaEye, FaListAlt } from 'react-icons/fa';

import Summary from './Summary';
import { useNavigate } from 'react-router-dom';


const {Content} = Layout;
export const Dashboard = ({news}) => {

  const catArr={"sports":sports, "politics":politics,"weather":weather,"health":health};
  const array = Object.keys(catArr);
  const sportsNews = news.filter(news => news.caption == 'sports');
  const politicsNews = news.filter(news => news.caption == 'politics');
  const weatherNews = news.filter(news => news.caption == 'weather');
  const healthNews = news.filter(news => news.caption == 'health');
  const catCount={"sports":sportsNews.length, "politics":politicsNews.length,"weather":weatherNews.length, "health":healthNews.length};
  // console.log(catCount);
 const user= JSON.parse(localStorage.getItem("userList"));
 
const navigate= useNavigate();
const adminName=localStorage.getItem('adminUser');



const admin=user.filter((e) => e.email==adminName);

const variant = "Primary";
const cats=new Set();
let totComm=0;

const totCatg=news.map((e)=>{
  cats.add(e.caption);
  totComm += e.comments.length;
});

const totArti=news.length;
  return (
    <Layout>
      <Siderf keys='1'/>
      <Content style={{overflowY:"auto" , backgroundColor:"#000"}}>
        <Container>
          <div style={{ textAlign: "center", margin: "2rem" }}>
            <h1
              style={{
                fontSize: "2rem",
                fontWeight: "bold",
                marginBottom: "1rem",
              }}
            >
              Welcome <i style={{color: "#0D6EFD"}}>{admin[0]?.name} </i>
            </h1>
            <p style={{ fontSize: "1.2rem",color: "#AA398F" }}><b>As an admin, you're the keeper of the keys to our news website. We're grateful for your hard work and dedication to delivering high-quality news content. Let's get started!</b></p>
          </div>
          <div style={{display:"flex", justifyContent:"space-around"}}>
            <Summary header="Total Categories" title={cats.size} key={1} icon="FaListAlt" variant={variant}/>
            <Summary header="Total Articles" title={totArti} key={2} icon="FaNewspaper" variant={variant}/>
            <Summary header="Total Comments" title={totComm} key={3} icon="FaComment" variant={variant}/>
          
        
          </div>
          <h4>Categories</h4>
          
          <div style={{marginLeft:'30px'}}>
            <Row xs={1} md={5} className="g-4">
              {array.map((key, idx) => (
                <Col>
                  <CatCard img={catArr[key]} title={key} key={idx} count={catCount[key]}/>
                </Col>
              ))}
            </Row>
          </div>
          <h4>Users</h4>
           <div style={{marginLeft:'30px'}}>
           <Row xs={1} md={5} className="g-4">
              {user.map((val, idx) => (
                
                <Col>
                  <UsersList user={val} key={idx}/>
                </Col>
              ))}
            </Row>
           
           </div>
        </Container>
      </Content>
      
    </Layout>
  )
}
const Container = styled.div`
  height:100vh;
  padding:10px;
  overflow-x:hidden;
`;

