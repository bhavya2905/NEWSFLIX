import React from 'react';

import newshome from "../assets/newshome.jpg"
import styled from 'styled-components';

const BackgroundImage = () => {
  return (
    <Container>
        <img src={newshome} alt="background" />
    </Container>
  )
}

const Container = styled.div`
    height:100vh;
    width:100vw;
    img{
        height:100vh;
        width:100vw;
    }
`;

export default BackgroundImage
