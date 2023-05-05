import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CardSlider from "./CardSlider";
export default function Slider({ movies , email}) {
  const [recommendCat, setRecommendCat] = useState('');

  const getRecommendationCat = async (email) => {
    try {
     await axios.get(`http://localhost:5000/api/admin/recommend/${email}`)
       .then(res => setRecommendCat(res.data.maxCategory))
       .catch(err => console.log(err));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(()=> {
    getRecommendationCat(email);
  },[]);

  const healthNews = movies.filter(news => news.caption == 'health');
  const sportsNews = movies.filter(news => news.caption == 'sports');
  const politicNews = movies.filter(news => news.caption == 'politics');
  const weatherNews = movies.filter(news => news.caption == 'weather');
  const recommended = movies.filter(news => news.caption == recommendCat);
  
  const headlines= movies.slice().reverse();
  // const getMoviesFromRange = (from, to) => {
  //   return movies.slice(from, to);
  // };
  return (
    <Container>
      <CardSlider data={recommended} title="Recommanded News" />
      <CardSlider data={headlines} title="Top Headlines" />
      <CardSlider
        data={sportsNews}
        title="Sports News"
      />
      <CardSlider
        data={weatherNews}
        title="Weather News"
      />
      <CardSlider data={healthNews} title="Health News" />
      <CardSlider data={politicNews} title="Polictics" />
    </Container>
  );
}

const Container = styled.div``;