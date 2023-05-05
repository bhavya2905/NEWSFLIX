import axios from "axios";

const options = {
  method: 'GET',
  url: 'https://youtube-v31.p.rapidapi.com/captions',
  params: {part: 'snippet', videoId: 'M7FIvfx5J10'},
  headers: {
    'X-RapidAPI-Key': 'c21d17b563msh84e077cddafe09bp1adc9ajsndd5bd14cbc74',
    'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
  }
};



export const youtubeApi=()=>{
    axios.request(options).then(function (response) {
        console.log(response.data);
    }).catch(function (error) {
        console.error(error);
    });
}