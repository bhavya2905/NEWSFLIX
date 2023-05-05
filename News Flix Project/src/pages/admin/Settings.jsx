import { Layout } from 'antd'
import styled from 'styled-components';
import React from 'react'
import Siderf from './Siderf'
const {Content} = Layout;


export const Settings = () => {
  return (
    <Layout>
      <Siderf keys='4'/>
      <Content>
        <Container>

        </Container>
      </Content>
      
    </Layout>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  
  background-color: #000;
`;
