import Layout, { Content } from 'antd/es/layout/layout'
import React from 'react'
import Button from 'react-bootstrap/esm/Button'
import RelatedNews from '../../components/RelatedNews'
import Siderf from './Siderf'
import styled from 'styled-components'

function ArticleList({news}) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const category = urlParams.get('title'); 
  return (
    <Layout>
        <Siderf />
        <Content>
            <Container>
                <h3 style={{color:"black"}}> Category : {category} </h3>
                <RelatedNews />
            </Container>
           
        </Content>
    </Layout>
    
  )
}

const Container = styled.div`
    padding:10px;
`;

export default ArticleList