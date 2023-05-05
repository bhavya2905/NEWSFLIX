import Navbar from '../components/Navbar';
import styled from 'styled-components';

import React, { useEffect, useState } from "react";
import ChannelDropdown from '../components/ChannelDropDown';
import { Col, Row } from 'react-bootstrap';




const NewsVideo = ({id}) => {
    const [data, setData] = useState([]);
    const source = ['ABC_NEWS', 'BBC_NEWS', 'CNN', 'FOX_NEWS', 'NBC_NEWS'];
    const ind_source = ['NDTV', 'India_Today','Aaj_Tak', 'News18_Kannada', 'Tv9_Kannada', 'BBC_News', 'NBC_NEWS'];

    useEffect(() => {
      async function fetchData() {
        console.log(import.meta.env)
      const response = await fetch(`http://localhost:5000/api/youtube/${ind_source[id]}`);
      const jsonList = await response.json();
      setData(jsonList);}
      fetchData();
    }, []);
    const [isScrolled, setIsScrolled] = useState(false);
    window.onscroll = () => {
        setIsScrolled(window.pageYOffset === 0 ? false : true);
        return () => (window.onscroll = null);
      };
    return (<Container>
        
        <Navbar isScrolled={isScrolled}/>
        <div className="content ">
        <Row className="align-items-center">
            <Col>
                <h1>Channel: {ind_source[id].replace('_', ' ')}</h1>
            </Col>
            <Col className="text-end">
                <ChannelDropdown />
            </Col>
            </Row>
            
            <div className="container px-5 py-24 mx-auto">
            <div className="row">
          {data.map((item,i) => {
            return (
              <div className=" col s3 p-6 ml-9" key={i}>
                <iframe
                  width="400"
                  height="300"
                  src={item.VideoLink}
                  title="YouTube video player"
                  frameBorder="10"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
                {/* <embed width="400" height="300" src={item.VideoLink} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></embed> */}
                
              </div>
            );
          })}
        </div>
            </div>
        </div>
    </Container>);
}

const Container =styled.div`
.content {
    margin: 2.3rem;
    margin-top: 8rem;
    gap: 3rem;
    h1 {
      margin-left: 3rem;
    }
    .grid {
      flex-wrap: wrap;
      gap: 1rem;
    }
  }
  `;

export default NewsVideo